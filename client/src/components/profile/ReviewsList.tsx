interface Review {
  from: string
  rating: number
  comment: string
  date: string
}

export function ReviewsList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="backdrop-blur-md rounded-xl p-6 border border-white/20">
      <h2 className="text-xl font-semibold mb-4">Reviews from Freelancers</h2>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{review.from}</span>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">{"★".repeat(review.rating)}</span>
                <span className="text-gray-400 text-sm">{review.rating}/5</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-2">{review.comment}</p>
            <span className="text-gray-400 text-xs">{review.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}