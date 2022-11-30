import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import TravelData from '../TravelData'

const constantTypes = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class TravelGuide extends Component {
  state = {data: [], apiStatus: constantTypes.initial}

  componentDidMount() {
    this.getTravelData()
  }

  getTravelData = async () => {
    this.setState({apiStatus: constantTypes.loading})
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.packages.map(item => ({
        id: item.id,
        description: item.description,
        imageUrl: item.image_url,
        name: item.name,
      }))
      console.log(data)
      this.setState({data: updatedData, apiStatus: constantTypes.success})
    }
  }

  renderSuccess = () => {
    const {data} = this.state
    return (
      <>
        <ul className="travel-items">
          {data.map(item => (
            <TravelData item={item} key={item.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoading = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constantTypes.success:
        return this.renderSuccess()
      case constantTypes.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="heading">Travel Guide</h1>
        <div className="travel">{this.renderStatus()}</div>
      </div>
    )
  }
}

export default TravelGuide
