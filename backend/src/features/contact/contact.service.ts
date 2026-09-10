import  {ContactRequest} from "../../models/ContactRequest.js";
import type { CreateContactRequestInput } from "./contact.validator.js";

export async function createContactRequest(
  input: CreateContactRequestInput,
) {
  const request = await ContactRequest.create({
    ...input,
    organization: input.organization || undefined,
    phone: input.phone || undefined,
    source: "website",
    status: "new",
  });

  return {
    id: request._id.toString(),
    message: "Contact request received successfully.",
  };
}