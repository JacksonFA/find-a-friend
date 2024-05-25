export class AddressIsObligatoryError extends Error {
  constructor() {
    super('The Address is obligatory.')
  }
}
