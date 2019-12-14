module RTimesHelper
  def create_scramble(size,puzzle)
    scramble=0
    case puzzle
    when 0
      scramble = Scrambler::TwoByTwo.new.scramble(size)
    when 1
      scramble = Scrambler::ThreeByThree.new.scramble(size)
    when 2
      scramble = Scrambler::FourByFour.new.scramble(size)
    when 3
      scramble = Scrambler::FiveByFive.new.scramble(size)
    when 4
      scramble = Scrambler::SixBySix.new.scramble(size)
    when 5
      scramble = Scrambler::SevenBySeven.new.scramble(size)
    when 6
      scramble = Scrambler::Pyraminx.new.scramble(size)
    when 7
      scramble = Scrambler::Clock.new.scramble(size)
    when 8
      scramble = Scrambler::Square1.new.scramble(size)
    when 9
      scramble = Scrambler::Square1.new.scramble(size)
    else
      scramble = Scrambler::ThreeByThree.new.scramble(25);
    end
    return scramble
  end
end
