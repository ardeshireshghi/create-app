async function createFrontendApp({ name, frontendAppCreator }) {
  await frontendAppCreator.build(name);
}

module.exports = createFrontendApp;
