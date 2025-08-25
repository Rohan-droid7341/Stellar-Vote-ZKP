import createTranspileModules from 'next-transpile-modules';

const withTM = createTranspileModules(['hello_world']);

export default withTM({});
