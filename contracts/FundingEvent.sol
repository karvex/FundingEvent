pragma solidity ^0.5.0;

contract FundingEvent {

    struct Speaker {
        address owner;
        string name;
        string bio;
        string url;
    }

    struct Participant {
        string name;
        string email;
    }

    struct Location {
        address owner;
        string streetAddress;
        uint cost;
        uint capacity;
    }

    enum MeetupStatus {
        ongoing, finished, cancelled
    }

    struct Meetup {
        address creator;
        string title;
        uint blockTime;
        address speaker;
        address location;
        uint minAmount;
        uint balance;
        MeetupStatus status;
    }

    Speaker[] private speakers;
    mapping(address => Participant) private participants;
    Location[] private locations;
    Meetup[] private meetups;
    mapping(address => mapping(address => uint)) donators;

    function registerSpeaker(string memory name, string memory bio, string memory url) public {
        require(!speakerExists(msg.sender), "Speaker already exist");
        speakers.push(Speaker(msg.sender, name, bio, url));
    }

    function getSpeaker(uint index) public view returns (string memory, address, string memory, string memory) {
        require(speakers.length > index, "Out of bounds array index");
        Speaker storage speaker = speakers[index];
        return (speaker.name, speaker.owner, speaker.bio, speaker.url);
    }

    function registerParticipant(string memory name, string memory email) public {
        participants[msg.sender] = Participant(name, email);
    }

    function registerLocation(string memory streetAddress, uint cost, uint capacity) public {
        locations.push(Location(msg.sender, streetAddress, cost, capacity));
    }

    function getLocation(uint index) public view returns (string memory, address, uint, uint) {
        require(locations.length > index, "Out of bounds array index");
        Location storage location = locations[index];
        require(location.capacity > 0, "Location capacity cannot be 0 or less");
        return (location.streetAddress, location.owner, location.cost, location.capacity);
    }

    function createMeetup(string memory title, uint blockTime, address speaker, address location) public {
        require(locationExists(location), "Location does not exist");
        require(speakerExists(speaker), "Speaker does not exist");
        require(blockTime > now, "Blocktime must be after now");
        meetups.push(Meetup(msg.sender, title, blockTime, speaker, location, 0, 0, MeetupStatus.ongoing));
    }

    function getMeetup(uint index) public view returns (address, string memory, uint, address, address, uint, uint, uint) {
        require(meetups.length > index, "Out of bounds array index");
        Meetup storage meetup = meetups[index];
        require(meetup.blockTime != 0, "Blocktime cannot be 0");
        return (meetup.creator, meetup.title, meetup.blockTime, meetup.speaker, meetup.location,
            meetup.minAmount, meetup.balance, uint(meetup.status));
    }

    function getMeetupCount() public view returns (uint) {
        return meetups.length;
    }

    function getSpeakerCount() public view returns (uint) {
        return speakers.length;
    }

    function getLocationCount() public view returns (uint) {
        return locations.length;
    }

    function donate(address meetup) public payable meetupExists(meetup) {
        require(msg.value > 0, "Value must be greater than 0");
        donators[meetup][msg.sender] += msg.value;
        getMeetup(meetup).balance += msg.value;
    }

    function setMinMeetupAmount(address meetup, uint minAmount) public meetupExists(meetup) {
        Meetup storage currentMeetup = getMeetup(meetup);
        require(speakerExists(msg.sender), "Speaker does not exist");
        require(currentMeetup.speaker == msg.sender, "Speaker is not equal to current meetup speaker");
        require(minAmount > 0, "Min amount must be greater than 0");
        currentMeetup.minAmount = minAmount;
    }

    function participantWithdrawal(address meetup) public meetupExists(meetup) participantExists(msg.sender) {
        //TODO: prevent refunds 48h before the meetup
        uint amount = donators[meetup][msg.sender];
        require(amount > 0, "Amount must be greater than 0");
        if (getMeetup(meetup).status != MeetupStatus.finished) {
            donators[meetup][msg.sender] = 0;
            msg.sender.transfer(amount);
        }
    }

    function speakerWithdrawal(address meetup) public meetupExists(meetup) {
        //TODO: check min amount!, isSpeakerAtMeetup?
        require(speakerExists(msg.sender), "Speaker does not exist");
        Meetup storage currentMeetup = getMeetup(meetup);
        require(currentMeetup.blockTime < now, "Current block time must be greater than now");
        currentMeetup.balance = 0;

        if (currentMeetup.status != MeetupStatus.finished) {
            msg.sender.transfer(currentMeetup.balance);
            currentMeetup.status = MeetupStatus.finished;
        }
    }

    function getMeetup(address meetup) private view returns (Meetup storage) {
        for (uint i = 0; i < meetups.length; i++) {
            if (meetups[i].creator == meetup) {
                return meetups[i];
            }
        }
        revert("Failed to get meetup. No meetups in array");
    }

    function speakerExists(address speaker) private view returns (bool) {
        for (uint i = 0; i < speakers.length; i++) {
            if (speakers[i].owner == speaker) {
                return true;
            }
        }
        return false;
    }

    function locationExists(address location) private view returns (bool) {
        for (uint i = 0; i < locations.length; i++) {
            if (locations[i].owner == location) {
                return true;
            }
        }
        return false;
    }

    modifier participantExists(address participant) {
        require(bytes(participants[participant].name).length != 0, "Participant does not exist");
        _;
    }

    modifier meetupExists(address meetup) {
        bool success = false;
        for (uint i = 0; i < meetups.length; i++) {
            if (meetups[i].creator == meetup) {
                success = true;
                break;
            }
        }
        if (success == false) {
            revert("meetup doesn not exist");
        }
        _;
    }
}