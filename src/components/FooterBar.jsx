function FooterBar({ appName }) {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>
                    &copy; {new Date().getFullYear()} {appName}. Todos los
                    derechos reservados.
                </p>
            </div>
        </footer>
    );
}

export default FooterBar;