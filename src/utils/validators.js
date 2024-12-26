export function validateEmail(email) {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  return regex.test(String(email).toLowerCase())
}

export function validatePassword(password) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&~`$^/\\().,['":])[A-Za-z\d@$!%*#?&~`$^/\\().,['":]{8,}$/g
  return regex.test(password)
}

export function validate_txhash(addr)
{
  return /^0x([A-Fa-f0-9]{64})$/.test(addr);
}