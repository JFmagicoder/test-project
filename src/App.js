import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const COURSES = [
    'Technical Report Writing',
    'English Literature',
    'Computer Sciences'
  ];
  const SUBJECTS = [
    [
      'Short Reports',
      'Annual Reports',
      'Presentations'
    ],
    [
      'Poetry',
      'Short Stories',
      'Drama'
    ],
    [
      'Web Development',
      'Desktop Software Development',
      'Research and Analysis'
    ]
  ];
  const INITIAL_STATE = {
    course: '',
    courseIndex: null,
    subject: '',
    startDate: null,
    note: '',
    loading: false,
    error: {
      course: '',
      subject: '',
      startDate: '',
      note: ''
    }
  };
  const [state, setState] = useState(INITIAL_STATE);

  const setStartDate = event => {
    setState({
      ...state,
      startDate: event.target.value,
      error: { ...state.error, startDate: '' }
    });
  };

  const updateNote = event => {
    setState({
      ...state,
      note: event.target.value,
      error: { ...state.error, note: '' }
    });
  };

  const chooseSubject = event => {
    setState({
      ...state,
      subject: event.target.value,
      error: { ...state.error, subject: '' }
    });
  }

  const chooseCourse = courseIndex => () => {
    setState({
      ...state,
      course: COURSES[courseIndex],
      courseIndex,
      subject: SUBJECTS[courseIndex][0],
      error: { ...state.error, course: '' }
    });
  };

  const validateForm = () => {
    const validDate = [
      '2019-12-20',
      '2020-01-15',
      '2020-02-01'
    ]
    if (!state.course) {
      setState({
        ...state,
        error: {
          ...state.error,
          course: 'Course is required'
        }
      });
      return false;
    }
    if (!state.subject) {
      setState({
        ...state,
        error: {
          ...state.error,
          subject: 'Subject is required'
        }
      });
      return false;
    }
    if (!state.startDate) {
      setState({
        ...state,
        error: {
          ...state.error,
          startDate: 'StartDate is required'
        }
      });
      return false;
    }
    if (validDate.indexOf(state.startDate) === -1) {
      setState({
        ...state,
        error: {
          ...state.error,
          startDate: 'Your selected course and subject is not offered beginning from your selected date'
        }
      });
      return false;
    }
    if (state.note && (state.note.length < 20 || state.note.length > 500)) {
      setState({
        ...state,
        error: {
          ...state.error,
          note: 'notes should be between 20 and 500 characters'
        }
      });
      return false;
    }
    return true;
  };

  const submit = () => {
    if (validateForm()) {
      setState({
        ...state,
        loading: true
      });
      setTimeout(() => {
        setState({
          ...state,
          loading: false
        });
      }, 2000);
    }
  };

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevLoading = usePrevious(state.loading) || state.loading;

  useEffect(() => {
    if (prevLoading !== state.loading && !state.loading) alert('Your course has been successfully registered.');
  });

  return (
    <div>
      <h2>Test Project</h2>
      <hr />
      <p>Please select course:</p>
      {
        COURSES.map((course, index) => (
          <div key={index}>
            <input type="radio" name="course" onClick={chooseCourse(index)} />
            <label>{course}</label><br />
          </div>
        ))
      }
      {state.error.course && <p className="errorStyle">{state.error.course}</p>}

      <p>Please select subject:</p>
      <select value={state.subject} onChange={chooseSubject}>
        {
          SUBJECTS[state.courseIndex] && SUBJECTS[state.courseIndex].map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))
        }
      </select>
      {state.error.subject && <p className="errorStyle">{state.error.subject}</p>}

      <p>Please select start date:</p>
      <input type="date" defaultValue={state.startDate} onChange={setStartDate}></input>
      {state.error.startDate && <p className="errorStyle">{state.error.startDate}</p>}

      <p>Additional Note:</p>
      <textarea id="note" rows="4" cols="50" onChange={updateNote} value={state.note} /><br />
      {state.error.note && <p className="errorStyle">{state.error.note}</p>}

      <button type="button" className='buttonload' onClick={submit}>
        {state.loading && <i className="fa fa-spinner fa-spin" />}
        submit
      </button>
    </div>
  );
}

export default App;