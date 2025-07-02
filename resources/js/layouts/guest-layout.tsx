import { ReactNode } from "react"
import Navbar from "./navbar/navbar"

interface Props {
    children: ReactNode
}

export default function GuestLayout({ children }: Props) {
    return (
        <div className="flex flex-col flex-1 h-full w-full bg-sky-50">
            <Navbar></Navbar>
            {children}
        </div>
    )
};
