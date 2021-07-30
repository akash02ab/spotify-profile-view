import Main from "./Main";
import Sidebar from "./Sidebar";

export default function App() {
	return (
		<div className="container">
			<Main>
				<Sidebar />
			</Main>
		</div>
	);
}
