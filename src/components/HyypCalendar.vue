<template>
    <!-- Toggle View -->
    <div style="display:flex">
        <p class="sticky">{{ windowHeight }}</p>
        <div style="margin-right: 10px">
            <input type="radio" value="Week" name="calendar" />
            <label>Week</label>
        </div>
        <div>
            <input type="radio" value="Day" name="calendar" />
            <label>Day</label>
        </div>
        <button @click="handleToggle" style="margin-left: 10px;"> Add New</button>
      
    </div>
    <!-- Calendar Component -->
    <div class="hyyp-calendar-wrapper">
        <FullCalendar :options="calendarOptions" class="hyyp-calendar" />
    </div>
    <!-- Modal Component -->
    
    <div :class="[isOpen ? 'slideIn' : 'slideOut']">
        <div class="locked centered" >
            <div class="modal-container">
                <button class="close-btn" @click="handleToggle">
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                    </button>
                <form>
                    <h2>Add New Event</h2>
                    <input type="text" placeholder="enter title"/>
                    <div>
                        <input type="time" id="timeInput" name="time">
                        <button> Set Start Time</button>
                    </div>
                    <div>
                        <input type="time" id="timeInput" name="time">
                        <button> Set End Time</button>
                    </div>
                    <div>
                        
                        <button> Save Event</button>
                    </div>
                </form>
    
            </div>
        </div>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

export default {
    mounted() {
        window.addEventListener("resize", this.getScreenSize);
    },
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    props: {
        isOpen: Boolean,
        windowHeight: Number
    },
    methods: {
        toggleDayView() {

        },
        addNewEvent() {
            console.log('it worked')
        },
        handleToggle() {
            this.isOpen = !this.isOpen
        },
        getScreenSize() {
            this.windowHeight = window.innerHeight
        }

    },
    data() {
        return {
            calendarOptions: {
                height: "110%",
                stickyHeaderDates: true,
                plugins: [interactionPlugin, timeGridPlugin],
                initialView: 'timeGridWeek',
                events: [{
                    title: 'The Title', // a property!
                    start: '2023-07-18', // a property!
                    startTime: '08:30:00',
                    endTime: '11:00:00',
                    daysOfWeek: ['3'],

                }],
                customButtons: {
                    addEventButton: {
                        text: 'add event',
                        click: function() {
                            console.log('whatever')
                        }
                    }
                },
                windowResize: function(arg) {
                    console.log(arg)
                }
            },
            isOpen: false,
            windowHeight: window.innerHeight,
        }

    }
}
</script>

<style lang="scss" src="../assets/main.scss"/>
