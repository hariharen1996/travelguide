import {Component} from 'react'
import './index.css'

class TravelData extends Component {
  render() {
    const {item} = this.props
    const {imageUrl, name, description} = item
    return (
      <li className="travel-lists">
        <div className="travel-card">
          <img src={imageUrl} alt={name} className="travel-img" />
          <h1 className="travel-heading">{name}</h1>
          <p className="travel-desc">{description}</p>
        </div>
      </li>
    )
  }
}

export default TravelData
