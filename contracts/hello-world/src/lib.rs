#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Map, String, Vec};

#[derive(Clone)]
#[contracttype]
pub struct Workspace {
    pub id: u32,
    pub name: String,
    pub description: String,
}

#[derive(Clone)]
#[contracttype]
pub struct Event {
    pub id: u32,
    pub workspace_id: u32,
    pub title: String,
    pub votes: Map<String, u32>, // votes per option
    pub options: Vec<String>,
}

#[contracttype]
pub enum DataKey {
    Workspace(u32),
    WorkspaceCount,
    Event(u32),
    EventCount,
    Vote(u32, Address),      // fixed: tuple variant
    Member(u32, Address),    // workspace_id, user
    KeyAllowed(u32, String), // workspace_id, passkey hash
    KeyUsed(u32, String),    // workspace_id, passkey hash
}

#[contract]
pub struct VotingContract;

#[contractimpl]
impl VotingContract {
    pub fn create_workspace(env: Env, name: String, description: String) -> u32 {
        let  store = env.storage().persistent();

        let count: u32 = store.get(&DataKey::WorkspaceCount).unwrap_or(0);
        let id = count + 1;

        let ws = Workspace {
            id,
            name,
            description,
        };
        store.set(&DataKey::Workspace(id), &ws);
        store.set(&DataKey::WorkspaceCount, &id);
        id
    }

    pub fn get_workspace(env: Env, id: u32) -> Option<Workspace> {
        let store = env.storage().persistent();
        store.get(&DataKey::Workspace(id))
    }

    pub fn create_event(env: Env, workspace_id: u32, title: String, options: Vec<String>) -> u32 {
        let store = env.storage().persistent();

        if store
            .get::<_, Workspace>(&DataKey::Workspace(workspace_id))
            .is_none()
        {
            panic!("Workspace does not exist");
        }

        let count: u32 = store.get(&DataKey::EventCount).unwrap_or(0);
        let id = count + 1;

        let mut votes = Map::<String, u32>::new(&env);
        for opt in options.iter() {
            votes.set(opt, 0u32);
        }
        let event = Event {
            id,
            workspace_id,
            title,
            votes,
            options,
        };

        store.set(&DataKey::Event(id), &event);
        store.set(&DataKey::EventCount, &id);
        id
    }

    pub fn get_event(env: Env, id: u32) -> Option<Event> {
        let store = env.storage().persistent();
        store.get(&DataKey::Event(id))
    }

    // --- Register multiple passkey hashes
    pub fn register_keys(env: Env, workspace_id: u32, key_hashes: Vec<String>) -> u32 {
        let  store = env.storage().persistent();

        if store
            .get::<_, Workspace>(&DataKey::Workspace(workspace_id))
            .is_none()
        {
            panic!("Workspace does not exist");
        }

        let mut added: u32 = 0;
        for kh in key_hashes.iter() {
            let key = DataKey::KeyAllowed(workspace_id, kh.clone());
            if !store.has(&key) {
                store.set(&key, &true);
                added += 1;
            }
        }
        added
    }

    // --- Join with passkey hash
    pub fn join_workspace_with_key(env: Env, workspace_id: u32, key_hash: String, user: Address) {
        let  store = env.storage().persistent();

        if store
            .get::<_, Workspace>(&DataKey::Workspace(workspace_id))
            .is_none()
        {
            panic!("Workspace does not exist");
        }

        let allowed = DataKey::KeyAllowed(workspace_id, key_hash.clone());
        if !store.has(&allowed) {
            panic!("Invalid passkey hash");
        }

        let used = DataKey::KeyUsed(workspace_id, key_hash.clone());
        if store.has(&used) {
            panic!("Passkey already used");
        }

        let member_key = DataKey::Member(workspace_id, user.clone());
        store.set(&member_key, &true);
        store.set(&used, &true);
    }

    pub fn is_member(env: Env, workspace_id: u32, user: Address) -> bool {
        let store = env.storage().persistent();
        let member_key = DataKey::Member(workspace_id, user);
        store.has(&member_key)
    }

    pub fn vote(env: Env, event_id: u32, voter: Address, choice: String) {
        let  store = env.storage().persistent();

        // Fetch the event
        let mut event: Event = store
            .get::<_, Event>(&DataKey::Event(event_id))
            .expect("Event not found");

        // Check if voter is a member
        let member_key = DataKey::Member(event.workspace_id, voter.clone());
        if !store.has(&member_key) {
            panic!("Not a member");
        }

        // Check if voter already voted
        let vote_key = DataKey::Vote(event_id, voter.clone());
        if store.has(&vote_key) {
            panic!("Already voted");
        }

        // Find the index of the choice
        if event.votes.contains_key(choice.clone()) {
            let current = event.votes.get(choice.clone()).unwrap();
            event.votes.set(choice.clone(), current + 1);
        } else {
            panic!("Invalid choice");
        }

        // Update storage
        store.set(&DataKey::Event(event_id), &event);
        store.set(&vote_key, &true);
    }
}
