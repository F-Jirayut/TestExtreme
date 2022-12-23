import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <br/>
      <h1 style={{textAlign: "center"}}>การบ้าน</h1>
      <br/><br/>
      <div className="row">
        <div className="col-6"  style={{textAlign: "center"}}>
        <Link to="/ItemGame">
          <button type="button" style={{width: "300px", height: "100px", fontSize: "36px"}} className="btn btn-outline-primary">ข้อ 1</button>
        </Link>
        </div>
        <div className="col-6"  style={{textAlign: "center"}}>
          <Link to="/Accounts">
          <button type="button" style={{width: "300px", height: "100px", fontSize: "36px"}} className="btn btn-outline-info">ข้อ 2</button>
          </Link>
        </div>
      </div>
      
    </div>
  );
}

export default Home;
