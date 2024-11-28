
function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4 animate-slide-in">
            <h1 className="text-6xl font-bold text-destructive mb-4">403</h1>
            <h2 className="text-2xl font-semibold mb-2">Unauthorized Access</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-md">
                You don’t have permission to access this page. Please log in or contact the administrator.
            </p>
            <div className="flex sm:flex-row gap-4">
                <a
                    href="/login"
                    className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all"
                >
                    Log In
                </a>
                <a
                    href="/"
                    className="px-6 py-3 rounded-md bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
