// generateKeysPoseidon.js
const fs = require("fs");
const crypto = require("crypto");
const circomlib = require("circomlibjs"); // for Poseidon
const { buildPoseidon } = circomlib;

// Example employee data
const employees = [
  { name: "Alice", address: "123456" },
  { name: "Bob", address: "654321" },
  { name: "Charlie", address: "111222" },
];

// Helper function to convert string to BigInt
function strToBigInt(str) {
  return BigInt("0x" + Buffer.from(str).toString("hex"));
}

async function main() {
  const poseidon = await buildPoseidon();
  const F = poseidon.F; // finite field helpers

  const employeeKeys = [];

  for (const emp of employees) {
    // Generate a random secret key
    const secret = crypto.randomBytes(16).toString("hex");

    // Convert secret and address to BigInt
    const secretBI = strToBigInt(secret);
    const addressBI = strToBigInt(emp.address);

    // Poseidon hash: secret + address
    const hashBI = poseidon([secretBI, addressBI]);
    const hashedKey = F.toString(hashBI); // string representation

    employeeKeys.push({
      name: emp.name,
      address: emp.address,
      secret,
      hashedKey,
    });
  }

  fs.writeFileSync("employeeKeysPoseidon.json", JSON.stringify(employeeKeys, null, 2));
  console.log("Employee keys with Poseidon hash saved to employeeKeysPoseidon.json");
}

main();
