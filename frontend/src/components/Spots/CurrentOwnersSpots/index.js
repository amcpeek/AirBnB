import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  NavLink } from 'react-router-dom';
import {  getCurrentOwnersSpots } from '../../../store/spot'
import './CurrentOwnersSpots.css'
import { getUsersReviews, removeReview } from '../../../store/review';
import UpdateReviewModal from '../../Reviews/UpdateReview/UpdateReviewModal'
import { useHistory } from 'react-router-dom';
import { restoreUser } from '../../../store/session'
import { getUsersBookings } from '../../../store/booking';

let otherSrc = 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-21426276/original/7cceab2c-f3f2-4ed6-86b4-79bb32746dc0.jpeg?im_w=1200'

const CurrentOwnersSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [newSrc, setNewSrc] = useState('')

    // useEffect(() => {
    //  // dispatch(get)

    // }, [dispatch])

    useEffect(() => {
      dispatch(getCurrentOwnersSpots());
    }, [dispatch]);

    useEffect(() => {
      dispatch(getUsersReviews());
    }, [dispatch]);

    useEffect(() => {
      dispatch(restoreUser())
    }, [dispatch])

    useEffect(() => {
      dispatch(getUsersBookings())
    }, [dispatch])

    const usersBookings = useSelector(state => {
      if(state.bookings.currentUsersBookings) {
        return Object.values(state.bookings.currentUsersBookings)
      }
    })

    //future bookings
    let futureBookings = []
    if(usersBookings) {
      console.log(new Date())
      futureBookings = usersBookings.filter(book => new Date(book.startDate) >= new Date())
      console.log ('futureBookings', futureBookings)

    }

    //past bookings

    let pastBookings = []
    if(usersBookings) {
      console.log(new Date())
      pastBookings = usersBookings.filter(book => new Date(book.startDate) < new Date())
      console.log ('pastBookings', pastBookings)

    }

    const ownersSpots = useSelector(state => {
      if(state.spots.currentOwnersSpots) {
        return Object.values(state.spots.currentOwnersSpots)
      // } else {
      //   return []
      }
    })

   const userFirstName = useSelector(state => {
    if(state.session.user.firstName) {
      return  state.session.user.firstName
    }
   })


    const usersReviews = useSelector(state => {
      if(state.reviews.currentUsersReviews) {
        return Object.values(state.reviews.currentUsersReviews)
      // } else {
      //   return []
      }
    })

    // usersReviews.map((review) => {
    //   console.log('can I see a single review', review.avgRating)

    // })

    const handleRemoveReview = (reviewId) => {
     // console.log('what is review id', reviewId)
      dispatch(removeReview(reviewId))
      history.go(0)
    }

    //usersReviews && usersReviews[0].User.firstName




    return (
      <div className='CurrentOwnersPage'>

        {userFirstName && <h2 className='currentOwnersTitle'>{userFirstName}'s Profile</h2>}
        <h2 className='yourTripTitle'>Future Trips</h2>
        <div className='outerYourTrips'>
        <div className='yourTrips'>
        {futureBookings?.map(({id, spotId, userId, startDate, endDate, Spot}) => (
          <div key={id} className='oneTrip'>

            <img className='smallImg'
                            src={Spot.previewImage}
                            alt={Spot.name}
                            onError={(e)=>{
                              if(e.target.src !== otherSrc) {
                                setNewSrc(otherSrc)
                                e.target.src = otherSrc
                              }
                              }}
                            />
            <div className='tripDetails'>
            {/* <div>{Spot.name}</div> */}
            <div>{Spot.city}, {Spot.state}</div>
            {usersBookings && <div>
          {(new Date(startDate)).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
          &nbsp;-&nbsp;
          {(new Date(endDate)).toLocaleDateString('en-US', {month: 'short',year:'numeric',day: 'numeric'})}
          </div>}
          <div>Total: ${  (((new Date(endDate)) - (new Date(startDate)))/(1000 * 60 * 60 * 24))*Spot.price }</div>
          <div>Edit Delete</div>


            </div>

          </div>
        ))}
        </div>
        </div>
        <h2 className='yourTripTitle'>Past Trips</h2>
        <div className='outerYourTrips'>
        <div className='yourTrips'>
        {pastBookings?.map(({id, spotId, userId, startDate, endDate, Spot}) => (
          <div key={id} className='oneTrip'>

            <img className='smallImg'
                            src={Spot.previewImage}
                            alt={Spot.name}
                            onError={(e)=>{
                              if(e.target.src !== otherSrc) {
                                setNewSrc(otherSrc)
                                e.target.src = otherSrc
                              }
                              }}
                            />
            <div className='tripDetails'>
            {/* <div>{Spot.name}</div> */}
            <div>{Spot.city}, {Spot.state}</div>
            {usersBookings && <div>
          {(new Date(startDate)).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
          &nbsp;-&nbsp;
          {(new Date(endDate)).toLocaleDateString('en-US', {month: 'short',year:'numeric',day: 'numeric'})}
          </div>}
          <div>Total: ${  (((new Date(endDate)) - (new Date(startDate)))/(1000 * 60 * 60 * 24))*Spot.price }</div>



            </div>

          </div>
        ))}
        </div>
        </div>
        <h2 className='yourTripTitle'>Your Homes</h2>
        <div className="CurrentHomeList">

                {ownersSpots?.map(({ id, name, previewImage, city, state, description, price, avgRating }) => (
                  <div className="AllSpotsImages" key={id}>
                    <NavLink to={`/spots/${id}`}>
                                <div>
                                <img
                            src={previewImage}
                            alt={name}
                            onError={(e)=>{
                              if(e.target.src !== otherSrc) {
                                setNewSrc(otherSrc)
                                e.target.src = otherSrc
                              }
                              }}

                            />
                                </div >
                                <div className='SpaceBetween'>
                                <div className='greyText nowrapAllSpots' id="CityState">{city}, {state}</div>
                                <div>
                                <i className="material-symbols-outlined">star </i>
                                {avgRating}
                                </div>

                                </div>
                      <div className='greyText nowrapAllSpots'>{name}</div>
                      <div className='greyText'>Apr 3-8</div>
                      <div className='justNextToEachOther'> <div className='bold'>${price}</div>  night</div>
                    </NavLink>
                  </div>
                ))}
        </div>


        {userFirstName && <h2 className='currentOwnersTitle'>{userFirstName}'s Reviews</h2>}



             <div className="CurrentOwnersReviews">


                    {usersReviews && usersReviews?.map((review) => (
                       <NavLink to={`/spots/${review.spotId}`}>
                      <div  key={review.id} className='insideCurrentOwner'>
                              <div className="SingleSpotReviewBox" key={review.id}>
                                <h4 className='underlined shouldWrap'>{review.Spot.name}</h4>
                                <h5 className='shouldWrap'>{review.Spot.city}, {review.Spot.state}</h5>
                                    <div><i className="material-symbols-outlined">star </i> {review.stars} stars</div>
                                    <p className='shouldWrap'>{review.review}</p>

                                    {/* {<><UpdateReviewModal/></>}
                                    {<button onClick={()=> handleRemoveReview(review.id) }>
                                      <i className="material-symbols-outlined">
                                        delete
                                        </i></button>} */}
                              </div>
                      </div>
                      </NavLink>
                    ))}
              </div>
      </div>
    );
}

export default CurrentOwnersSpots
