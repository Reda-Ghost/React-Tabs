import React, { useState, useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import Loading from './Loading';

const url = 'https://course-api.com/react-tabs-project';

function App() {
	const [loading, setLoading] = useState(true);
	const [jobs, setJobs] = useState([]);
	const [value, setValue] = useState(0);

	const fetchJobs = async () => {
		const response = await fetch(url);
		const data = await response.json();
		setJobs(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchJobs();
	}, []);

	if (loading) {
		return <Loading />;
	}

	const { title, duties, company, dates } = jobs[value];

	return (
		<section className="section">
			<div className="title">
				<h2>Experience</h2>
				<div className="underline"></div>
			</div>
			<div className="jobs-center">
				<div className="btn-container">
					{jobs.map((job, index) => {
						const { id, company } = job;
						return (
							<button
								className={`job-btn ${index === value ? 'active-btn' : ''}`}
								key={id}
								onClick={() => setValue(index)}
							>
								{company}
							</button>
						);
					})}
				</div>

				<article className="job-info">
					<h3>{title}</h3>
					<h4>{company}</h4>
					<p className="job-date">{dates}</p>
					{duties.map((duty, index) => {
						return (
							<div key={index} className="job-desc">
								<FaAngleDoubleRight className="job-icon" />
								<p>{duty}</p>
							</div>
						);
					})}
				</article>
			</div>
		</section>
	);
}

export default App;
