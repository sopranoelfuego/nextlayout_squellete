'use server'

import {revalidateTag} from "next/cache"
import { MemberType } from "../../../types";

interface ISubmitProps {
  values: MemberType;
  member: MemberType;
  cb:any;
}
export default async function handleSubmit({
  values,
  member,
  cb
}: ISubmitProps) {
    
    if (member.id)
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_ROOT_API}/membres/${member.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        cb()
        revalidateTag('members')
      } catch (error) {
        alert(`error:${error}`);
      }
    else
      try {
        await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/membres`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        cb()
        revalidateTag('members')
      } catch (error) {
        alert(`error:${error}`);
      }
  
};
