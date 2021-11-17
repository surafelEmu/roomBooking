import React , {useState} from 'react' ;

const CheckAval =  ({ history }) => {

    const [keyword , setKeyword] = useState('') ;
    const searchHandler = (e) => {
        e.preventDefault()

        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/') ;
        }
    }

    return (
        <form class="card" onSubmit={searchHandler}>
								<div class="form-group">
									<span class="form-label">Your Destination</span>
									<input onChange={(e) => setKeyword(e.target.value)}
                                     class="form-control" type="text" placeholder="Enter a destination or hotel name" />
								</div>
								<div class="row">
									<div class="col-sm-6">
										<div class="form-group">
											<span class="form-label">Check In</span>
											<input class="form-control" type="date"/>
										</div>
									</div>
									<div class="col-sm-6">
										<div class="form-group">
											<span class="form-label">Check out</span>
											<input class="form-control" type="date"/>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-4">
										<div class="form-group">
											<span class="form-label">Rooms</span>
											<select class="form-control">
												<option>1</option>
												<option>2</option>
												<option>3</option>
											</select>
											<span class="select-arrow"></span>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="form-group">
											<span class="form-label">Adults</span>
											<select class="form-control">
												<option>1</option>
												<option>2</option>
												<option>3</option>
											</select>
											<span class="select-arrow"></span>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="form-group">
											<span class="form-label">Children</span>
											<select class="form-control">
												<option>0</option>
												<option>1</option>
												<option>2</option>
											</select>
											<span class="select-arrow"></span>
										</div>
									</div>
								</div>
								<div class="form-btn">
									<button class="btn">Check Avaliablity</button>
								</div>
							</form>
    )
}

export default CheckAval ;