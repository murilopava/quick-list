import { Item } from "../types";

export default function validateItems(valorInput: string, items: Item[]) {
  if (valorInput === "") {
    return "O campo não pode estar vazio";
  } else if (
    items.some((item) => item.name.toLowerCase() === valorInput.toLowerCase())
  ) {
    return "Item já existe na lista";
  }

  return "";
}
