require 'faker'
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Chatroom.create(name: "General")
Chatroom.create(name: "Funsies")
Chatroom.create(name: "Tech!")
User.create(email: "nikola@awa.awa", password: "password", password_confirmation: "password")

5.times do
  rand_mail = "#{Faker::Name.first_name.downcase}@mail.com"
  User.create(email: rand_mail, password: "password", password_confirmation: "password")
  puts "Created #{rand_mail}"
end

puts "Done!"