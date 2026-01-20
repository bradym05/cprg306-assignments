import Link from "next/link"

export default function StudentInfo() {
    return (
        <div>
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                Brady Maki
            </h1>
            <Link href="https://github.com/bradym05/cprg306-assignments">
                Github Repository
            </Link>
        </div>
    )
}