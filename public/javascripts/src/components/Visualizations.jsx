
var Visualization = require("./Visualizations/Visualization.jsx");
var React = require("react");
var ReactBootstrap = require("react-bootstrap");

//var Summary = require("./Visualizations/Summary.jsx");

var Tabs      = ReactBootstrap.Tabs,
    Tab         = ReactBootstrap.Tab,
    Modal = ReactBootstrap.Modal,
    Button          = ReactBootstrap.Button;




class OptionsBar extends React.Component {
  constructor(props){
    super(props);
    //console.log("woot");
    return { showModal: false };
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  render() {

    //var self = this;
    //console.log(self.state.showModal);
    //console.log(this.props.currData);
    var attributes = [];

    for(var i in this.props.currData){
      if(this.props.currData.hasOwnProperty(i)){
        attributes.push(i);
      }
    }

    var url = "/save?attributes={list:"+(attributes)+"}";

    var Attributes = attributes.map(function(d){
      return(
          <input type="checkbox" value="{d}">{d}</input>
          );
    });
    return(
      <div>
        <div id="OptionsBar" className="modal-container">
        <Button bsStyle="success" title="Download data" onClick={this.open}> Download</Button>
        </div>
        {

          this.state.showModal ?
            <Modal show={false} onHide={this.close}>
            <h1>Download data</h1>

            {Attributes}

          <br />
            <a href={url}><Button>Download</Button></a>
            <Button onClick={this.close}>Close</Button>

            </Modal>
            :
            <div />
        }
      </div>
    );
  }
}

class Visualizations extends React.Component {
  render() {

    var self  = this;

    if(this.props.config){

      var count=0;
      var visualizations = this.props.config.map(function(visualization){

        count++;   
        if(!visualization.tabTitle){
          visualization.tabTitle = visualization.visualizationType;
        }
        return(
            <Tab title={visualization.tabTitle} eventKey={count} key={count} id={visualization.tabTitle}>
            <div className="visualizationArea">
            <Visualization config ={visualization} debug={self.props.debug} currData={self.props.currData}  />
            </div>
            </Tab>
            );            
      });


      return(
        <div id="visualization_wrapper">
          <div id="visualization" className="">
            <Tabs defaultActiveKey={1} id="tabs">
              {visualizations}
            </Tabs>
          </div>
        </div>
      );

    }
    return (
      <div></div>
    );
  }
}

module.exports = Visualizations;
