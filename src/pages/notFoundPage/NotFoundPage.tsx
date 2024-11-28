export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <div className="text-center animate-slide-in">
                <h1 className="text-8xl font-extrabold tracking-tight text-primary">404</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <div className="mt-8">
                    <a
                        href="/"
                        className="p-4 rounded bg-primary text-primary-foreground hover:bg-secondary hover:text-primary transition-all"
                    >
                        Go Home
                    </a>

                </div>
            </div>
        </div>
    );
}
