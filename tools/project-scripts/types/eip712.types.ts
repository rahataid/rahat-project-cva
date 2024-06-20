type Schema = Record<string, string>;

const formatType = (schema: Schema) =>
  Object.entries(schema).map(([name, type]) => ({ name, type }));

const mapValues = <T, R>(
  obj: Record<string, T>,
  fn: (value: T) => R
): Record<string, R> =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v)]));

const eip712Types = mapValues(
  {
    EIP712Domain: {
      name: 'string',
      version: 'string',
      chainId: 'uint256',
      verifyingContract: 'address',
      salt: 'bytes32',
    },
    ForwardRequest: {
      from: 'address',
      to: 'address',
      value: 'uint256',
      gas: 'uint256',
      nonce: 'uint256',
      deadline: 'uint48',
      data: 'bytes',
    },
  },
  formatType
);

export { formatType, eip712Types };
