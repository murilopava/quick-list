import { List, ListLS } from "../types";

export default function validateLists(input: string, lists: ListLS[]) {
  if (input === "") {
    return "O campo não pode estar vazio.";
  }
}
