const ensRegex = /.+\..+/;
export const isENS = (address = "") => ensRegex.test(address);
