import React from 'react';
import {connect} from 'react-redux';
import {getTableIdToTables} from '../reducers'
import {selectPath} from '../actionCreators'
import {Alert, Badge} from 'react-bootstrap';

const Table = (props) => {
  const {tables} = props;
  const tableId = props.desc.table;
  const table = tables[tableId];
  return (
    <span>&nbsp;<strong>{table.label}</strong>&nbsp;</span>
  );
};

const Field = (props) => {
  const fieldId = props.desc.field;
  return (
    <Badge>{fieldId}</Badge>
  );
};

class Path extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    this.toggleHover= this.toggleHover.bind(this);
  }

  toggleHover(state){
    this.setState({hover: state})
  }

  render() {
    var linkStyle;
    if (this.state.hover) {
      linkStyle = 'danger';
    } else {
      linkStyle = 'warning';
    }

    const {path} = this.props;
    let i = 0;
    const components = path.map((part) => {
      if (part.table) {
        return <Table key={i++} desc={part} tables={this.props.tableIdToTables}/>;
      } else if (part.field) {
        return <Field key={i++} desc={part}/>;
      } else {
        throw "Error with part " + part;
      }
    });

    return (
      <Alert onClick={this.props.onClick} bsStyle={linkStyle} onMouseEnter={() => {this.toggleHover(true)}} onMouseLeave={() => {this.toggleHover(false)}} >
        {components}
      </Alert>
    );
  }
}

const mapStateToProps = (state) => (
  {
    tableIdToTables : getTableIdToTables(state)
  }
);

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    onClick : () => dispatch(selectPath(ownProps.path))
  }
);
export default connect(mapStateToProps, mapDispatchToProps)(Path);
