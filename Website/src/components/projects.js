// Import libraries
import React from 'react';

// Import components
import Project from './Project';
import RequireAuth from './RequireAuth';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      department: 'All Committees',
    };

    this.filterByDepartment = this.filterByDepartment.bind(this);
    this.departmentChanged = this.departmentChanged.bind(this);
    this.filterByStage = this.filterByStage.bind(this);
  }

  addProject() {
    this.props.addProject(false, 'add project on website');
  }

  compareNumbers(a, b) {
    return b.votes - a.votes;
  }

  departmentChanged(event) {
    event.preventDefault();
    this.setState({ department: event.target.text });
  }

  filterByDepartment(project) {
    if (this.state.department === 'All Committees') {
      return true;
    } else {
      return (this.state.department === project.department);
    }
  }

  filterByStage(project) {
    let targetStage = this.props.params.stage || 'new';
    return targetStage === project.stage;
  }

  render() {

    let Rows = this.props.projects.filter(this.filterByStage).filter(this.filterByDepartment).sort(this.compareNumbers).map((project, index, array) => {
      return <Project project={project} key={project.id} />
    });

    return (
      <div>
        <div id="rankHeader">
          <span className="h4">{this.state.department}</span>
          <div className="dropdown pull-right">
            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Filter by Committee
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li><a href="#" onClick={this.departmentChanged}>All Committees</a></li>
              <li><a href="#" onClick={this.departmentChanged}>Academic</a></li>
              <li><a href="#" onClick={this.departmentChanged}>Student Life</a></li>
              <li><a href="#" onClick={this.departmentChanged}>Tech & Comms</a></li>
              <li><a href="#" onClick={this.departmentChanged}>Social</a></li>
              <li><a href="#" onClick={this.departmentChanged}>Diversity</a></li>
              <li><a href="#" onClick={this.departmentChanged}>International</a></li>
              <li><a href="#" onClick={this.departmentChanged}>Careers</a></li>
              <li><a href="#" onClick={this.departmentChanged}>Athletic</a></li>
              <li><a href="#" onClick={this.departmentChanged}>Feedback App</a></li>
              <li><a href="#" onClick={this.departmentChanged}>Other</a></li>
            </ul>
          </div>
        </div>
        <div>
          {Rows}
        </div>
        <button type="button" className="btn btn-success" onClick={this.addProject.bind(this)}>Add Project</button>
      </div>
    );
  }
}

export default RequireAuth(Projects);