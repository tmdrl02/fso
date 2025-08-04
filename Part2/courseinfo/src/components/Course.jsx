const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>

  )
}

const Header = (props) => <h1>{props.course}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map(part =>
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    )}
  </div>
)



const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <p>total of {total} exercises</p>
    </div>
  )
}

export default Course