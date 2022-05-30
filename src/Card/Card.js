import "./Card.css";
import moment from "moment";

export default function Card(props) {
  const { articleIndex, pageIndex } = props;
  const className = articleIndex === pageIndex ? 'Card span-columns' : 'Card';
  const spanColumns = articleIndex === pageIndex ? true : false;

  return (
    <>
    {
      spanColumns ? 
      (
        <div className={className} >
          <img src={props.imgSrc} alt="Article" width="auto" height="200" />
          <div className="side-by-side">
            <p className="gray uppercase">{props.publisher}</p>
            <p className="gray">{moment(props.date).format('ll')}</p>
          </div>
          <p className="text">{props.description}</p>
          <h3>{props.title}</h3>
          <button className="black">read more</button>
          <hr />
        </div>
      ) 
      : 
      (
        <div className={className} >
          <img src={props.imgSrc} alt="Article" width="200" height="200" />
          <p className="gray center uppercase">{props.publisher}</p>
          <h3 className="center">{props.title}</h3>
          <p className="gray center">{moment(props.date).format('ll')}</p>
          <button>read more</button>
        </div>  
      )
    }
  </>
  );
}
