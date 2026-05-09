import { List } from "../types";

export default async function validateLists(input: string, list: List[]) {
  if (input === "") {
    return "O campo não pode estar vazio.";
  } else if (
    list.some((list) => list.shareId.toLowerCase() === input.toLowerCase())
  ) {
    return "Esta lista já esta no seu banco de listas!";
  }
}
