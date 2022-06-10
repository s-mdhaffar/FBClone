import "./home.css"
import Feed from '../../components/feed/Feed';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';

;


export default function Home ({socket}) {


	return (
		<div>
			<Topbar />
			<div className="homeContainer">
				<Sidebar />
				<Feed />
				<Rightbar />
			</div>
		</div>
	);
}
