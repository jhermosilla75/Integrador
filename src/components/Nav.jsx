
function Nav() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <h1 className="navbar-item">Logo</h1>
          </div>
    
          <div className="navbar-menu">
            <div className="navbar-end">
              <a className="navbar-item">Home</a>
              <a className="navbar-item">About</a>
              <a className="navbar-item">Contact</a>
              <a className="navbar-item">Iniciar sesion</a>
            </div>
          </div>
        </nav>
      );
}

export default Nav