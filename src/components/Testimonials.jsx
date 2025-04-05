const testimonials = [
  {
    content: "DashFriends has completely transformed how I track my gaming achievements. The interface is intuitive and the stats are incredibly detailed.",
    author: {
      name: "Sarah Chen",
      role: "Pro Gamer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  },
  {
    content: "As a casual gamer, I love how DashFriends makes it easy to track my progress and connect with friends. It's become an essential part of my gaming routine.",
    author: {
      name: "Michael Torres",
      role: "Casual Gamer",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  },
  {
    content: "The social features are amazing! Being able to share achievements and compete with friends adds a whole new dimension to gaming.",
    author: {
      name: "Emily Johnson",
      role: "Gaming Enthusiast",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Loved by gamers worldwide
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl lg:max-w-4xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <figure key={index} className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <blockquote className="text-gray-900">
                  <p className="text-base leading-relaxed">"{testimonial.content}"</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <img
                    className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                    src={testimonial.author.image}
                    alt={testimonial.author.name}
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author.name}</div>
                    <div className="text-gray-600">{testimonial.author.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 