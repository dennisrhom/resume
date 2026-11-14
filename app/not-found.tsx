import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-28 text-center">
      <p className="label label-accent mb-4">Error 404</p>
      <h1 className="text-4xl font-bold sm:text-5xl">This page is not in the drawing set.</h1>
      <p className="mx-auto mt-4 max-w-md text-paper-dim">The link is probably old. Try the home page.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
