import React from "react";
import SectionTitle from "../Common/SectionTitle";
import TestimonialCard from "./TestimonialCard";
import { testimonialData } from "./testimonialData";

const Testimonials = () => {
  return (
    <section className="relative z-10 bg-primary/[.03] py-16 md:py-20 lg:py-28 mx-16">
      <div className="container">
        <SectionTitle
          title="What Our Users Says"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonialData.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
      <hr className="border-slate-200" />
    </section>
  );
};

export default Testimonials;
