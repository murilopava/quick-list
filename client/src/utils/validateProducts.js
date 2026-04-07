export default function validateProducts(valorInput, lista) {
  if (valorInput === "") {
    return "O campo não pode estar vazio";
  } else if (
    lista.some((item) => item.toLowerCase() === valorInput.toLowerCase())
  ) {
    return "Item já existe na lista";
  }

  return "";
}
