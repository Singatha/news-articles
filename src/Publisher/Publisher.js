import "./Publisher.css";
import { PublisherContext } from '../App/App';
import { useContext } from 'react';

export default function Publisher(props) {
  const [setPublisher] = useContext(PublisherContext);
  return (
    <div className="Publisher">
        <hr />
        <h3>Publisher</h3>
        {
          props.publishers.length > 0 ?
          <ul>
            {
              props.publishers.map((publisher, index) => {
                return (
                  <li key={index}><a href="!#" onClick={(e) => setPublisher(e.target.text)}>{publisher.name}</a></li>
                )
              })
            } 
          </ul>
          :
          <p>No results</p>
        }
        <hr />
    </div>
  );
}
