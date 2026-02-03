/* Simplified Navbar setup to aid in visualization of Project Page */
/* To be later replaced by integration of proper navbar component */

export default function Navbar() {
    return (
        <div className="lt-nav">
            <div className="lt-nav-left">UMCS</div>
            <ul className="lt-nav-links">
                <li>home</li>
                <li>SIGs</li>
                <li>About</li>
                <li className="active">Projects</li>
                <li>Exec</li>
            </ul>
        </div>
    );
}