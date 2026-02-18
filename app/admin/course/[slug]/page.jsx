import React from 'react'
import CourseCompo from './CourseCompo';

const page = async({params}) => {
     const {slug} = await params;
      return (
    <CourseCompo  slug={slug} />
  )
}

export default page