export default function validateProducts(valorInput: string, lista: []) {
  if (valorInput === "") {
    return "O campo não pode estar vazio";
  } else if (
    lista.some(
      (item: string) => item.toLowerCase() === valorInput.toLowerCase(),
    )
  ) {
    return "Item já existe na lista";
  }

  return "";
}
