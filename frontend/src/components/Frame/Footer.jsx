/* Simplified Footer setup to aid in visualization of Project Page */
/* To be later replaced by integration of proper footer component */

export default function Footer() {
	return (
		<footer className="lt-footer">
			<div className="lt-footer-left">
				<div className="lt-logo">COMPUTING<br/>SOCIETY</div>
			</div>
			<div className="lt-footer-center">
				<ul>
					<li>Home</li>
					<li>Resources</li>
					<li>About</li>
					<li>Meet the team</li>
				</ul>
			</div>
			<div className="lt-footer-right">
				<button className="lt-join">Join Us!!!</button>
			</div>
		</footer>
	);
}
