import React from 'react';
import {getFieldsToTables, getTables, getTableIdToTables} from '../reducers'
import {connect} from 'react-redux';
import Path from './Path';

class PathsToWord extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      word : '',
      searchResults : []
    };
  }

  searchPaths(word) {
    const {fromTableId} = this.props;
    const {tableIdToTables} = this.props;
    const {fieldsToTables} = this.props;

    const alreadyVisitedTables = new Set();

    //const result = this.searchTable(alreadyVisitedTables, fromTableId, tableIdToTables, fieldsToTables, word)

    let result = [
      [{table:1, description : "Il y a une occurrence ici"}],
      [{table:1}, {field: 1}, {table:2, column : "IDDOSSIER"}],
      [{table:1}, {field: 1}, {table:2}],
      [{table:1}, {field: 2}, {table:3}, {field: 3}, {table: 2, description : "une autre ici"}],
    ];
    return result;
  }

  searchTable(alreadyVisitedTables, fromTableId, tableIdToTables, fieldsToTables, word) {
    const result = [];
    const currentPart = {
      table : fromTableId
    };
    console.log("Exploring table '"+fromTableId+"'");
    let table = tableIdToTables[fromTableId];
    if (table.label.includes(word)) {
      const newResultDescription = [{...currentPart, description : table.label}];
      result.push(newResultDescription);
    }
    alreadyVisitedTables.add(fromTableId);
    const fieldResult = {};
    table.fields.forEach((fieldId) => {
      let tableIds = fieldsToTables[fieldId];
      tableIds.forEarch((tId) => {
        if (!alreadyVisitedTables.has(tId)) {
          let subResult = this.searchTable(alreadyVisitedTables, tId, tableIdToTables, fieldsToTables, word);
          subResult.forEach((sr) => {
            const newResult = [currentPart];
            newResult.push(...sr);
            result.push(newResult);
          });
        }
      });
    });
    return result;
  }

  changeText(event) {
    const newText = event.target.value;
    const searchResults = this.searchPaths(newText);
    console.log("new search results:", searchResults);
    this.setState({
      word : newText,
      searchResults
    });
  }

  render() {
    const results = this.state.searchResults.map((r) => <Path path={r}/>);
    return (
      <div>
        <input type='text' onChange={this.changeText.bind(this)}/>
        <div>{this.state.word}</div>
        {results}
      </div>
    );

  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fieldsToTables : getFieldsToTables(state),
  tableIdToTables : getTableIdToTables(state),
  tables : getTables(state)
});

export default connect(mapStateToProps)(PathsToWord);