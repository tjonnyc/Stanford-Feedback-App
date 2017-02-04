'use strict';

//Import libraries
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Import Actions
import Actions from '../actions';

//Import components, functions, and styles
import Project from '../components/project.js';
import { Header } from '../components/common';
import styles from '../styles/styles_main.js';

class Projects extends Component {
	constructor(props) {
		super(props);
	}

	compareNumbers(a, b) {
		return b.votes - a.votes;
	}

	renderProjects() {
		const projects = this.props.projects.sort(this.compareNumbers).map((item, index) => {
			return (
				<Project
					item={item}
					key={index}
					navigate={this.props.navigate}
					saveProjectChanges={this.props.saveProjectChanges}
				/>
			);
		});
		
		return projects;
	}

	render() {
		return (
			<View style={styles.container}>

				<Header>
					Projects
				</Header>

				{/* List of projects */}
				<ScrollView>
					{this.renderProjects()}
				</ScrollView>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
