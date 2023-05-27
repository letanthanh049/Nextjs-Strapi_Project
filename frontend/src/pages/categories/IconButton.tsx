
import { Button } from "flowbite-react"
import Link from "next/link"

export const IconButton = ({ ...props }) => {
  return (
    <Link className='button' href={props.link}>
      <Button className="bg-black hover:bg-slate-600 text-[13px]" outline={true}>
        {props.label}
      </Button>
    </Link>
  )
}