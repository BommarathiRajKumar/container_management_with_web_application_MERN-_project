import React from 'react';
class Test extends React.Component {
    constructor(props) {
	    super(props);
	    this.state = { color: 'red' };
    }
    componentDidMount() {

	    // Changing the state after 2 sec
	    // from the time when the component
	    // is rendered
	    setTimeout(() => {this.setState({ color: 'blue' });}, 2000);
    }
    render() {
	    return (
	        <div>
		        <p 
                style={{
			    color: this.state.color,
			    backgroundColor: 'rgba(0,0,0,0.88)',
			    textAlign: 'center',
			    paddingTop: 20,
			    width: 400,
			    height: 80,
			    margin: 'auto'
		        }}
		        >GeeksForGeeks
                </p>
            </div>
	    );
    }
}
export default Test;
