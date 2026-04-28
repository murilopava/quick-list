import { List } from "../types";

export default function validateLists(input: string, lists: List[]) {
  if (input === "") {
    return "O campo não pode estar vazio.";
  }
}
