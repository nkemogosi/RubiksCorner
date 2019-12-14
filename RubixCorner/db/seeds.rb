# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#admin = User.create({})
admin = User.create!({email: 'admin@seeded.com',username:"admin",password: "123456"})
role = Role.create!({name: 'admin'})
users = User.create!([{email: 'one@seeded.com',username:"one",password: "123456"},{email: 'two@seeded.com',username:"two",password: "123456"},{email: 'three@seeded.com',username:"three",password: "123456"}])
channels = Channel.create!([{channel_name: 'General'},{channel_name: 'CFOP'},{channel_name: 'Roux'}])
discussions = Discussion.create!([{title:"Discussion 1",content:"This is the first discussion of the forum",channel_id: 1,user_id: 1},{title:"Discussion 2",content:"This is the first discussion about CFOP",channel_id: 2,user_id: 2},{title:"Discussion 1",content:"This is the first discussion about Roux",channel_id: 3,user_id: 3}])
replies = Reply.create!([{reply:"Wow the first discussion",discussion_id: 1,user_id: 2},{reply:"Yeah ikr. crazy!",discussion_id: 1,user_id: 1},{reply:"CFOP is by far the fastest method",discussion_id: 2,user_id: 4},{reply:"Roux is by far the fastest method",discussion_id: 3,user_id: 1}])

 20.times do
   RTime.create!({minutes:rand(4),seconds:rand(60),millisecs:rand(100),user_id:rand(1..3)})
 end
 admin.add_role :admin
