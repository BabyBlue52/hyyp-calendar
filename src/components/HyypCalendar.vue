<template>
    <!-- Toggle View -->
    <div style="display:flex">
        <p class="_sticky">{{ windowHeight }}</p>
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
        <FullCalendar ref="fullCalendar" :options="calendarOptions" class="hyyp-calendar" />
    </div>
    <p>Output: {{ newEvent }}</p>
    <!-- Modal Component -->
    
    <div v-if="isOpen">
        <div class="locked centered">
            <div class="modal-container">
                <button class="close-btn" @click="handleToggle">
                                <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                        </button>
                <div class="modal-header">
                    <img class="company-logo" src="https://www.coalitionrc.com/wp-content/uploads/2017/01/placeholder.jpg" />
                    <h2>Add New Event</h2>
                </div>
                <form @submit.prevent="getFormValues">
                    <input type="text" placeholder="enter title" v-model="newEvent.title" />
                    <div>
                        <p>{{ formattedStart }}<span>--</span>{{ formattedEnd }}</p>
                        <input type="radio" name="public" value="public">
                        <input type="radio" name="public" value="private">
                    </div>
                    <div class="form-footer">
                        <button class="cancel-btn"> Cancel</button>
                        <button class="save-btn" type="submit"> Save Event</button>
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
import { INITIAL_EVENTS, createEventsId } from './events'

export default {
    mounted() {
        window.addEventListener("resize", this.getScreenSize);
    },
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    props: {
        isOpen: Boolean,
        windowHeight: Number,
        // event_end_time: Date,
    },
    methods: {
        handleToggle() {
            setTimeout(() => {
                this.isOpen = !this.isOpen
            }, 150);
        },
        handleSlotSelect(selectInfo) {
            this.handleToggle();
            let title = this.newEvent.title
            let calendarApi = selectInfo.view.calendar

            calendarApi.unselect() // clear date selection

            if (title) {
                calendarApi.addEvent({
                    id: createEventsId(),
                    title,
                    start: selectInfo.startStr,
                    end: selectInfo.endStr
                })
            }

            let dateStringStart = selectInfo.startStr;
            let dateStringEnd = selectInfo.endStr;

            let dateObjStart = new Date(dateStringStart);
            let dateObjEnd = new Date(dateStringEnd);

            let options = {
                month: "long",
                weekday: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true
            };

            this.formattedStart = dateObjStart.toLocaleString('en-US', options)
            this.formattedEnd = dateObjEnd.toLocaleString('en-US', options)

        },
        loadEvents(events) {
            this.currentEvents = events;
            this.newEvent.title = ''
        },
        getScreenSize() {
            this.windowHeight = window.innerHeight
        },
        getFormValues() {
            this.loadEvents();
            this.handleToggle();
        },
        resetDates() {
            this.formattedStart = ""
            this.formattedEnd = ""
        },
    },
    

    data() {
        return {
            calendarOptions: {
                height: "100%",
                stickyHeaderDates: true,
                nowIndicator: true,
                selectable: true,
                plugins: [interactionPlugin, timeGridPlugin],
                initialView: 'timeGridWeek',
                initialEvents: INITIAL_EVENTS,
                select: this.handleSlotSelect,
                eventsSet: this.loadEvents,
                windowResize: function(arg) {
                    console.log(arg)
                }
            },
            currentEvents: [],
            isOpen: false,
            windowHeight: window.innerHeight,
            newEvent: {
                title: '',
                isPublic: false,
            }
        }

    },
    computed: {
        // formattedStart() {  
        //     console.log("Event Start Time:", this.event_start_time);
        //     let dateString = this.event_start_time;
        //     let dateObj = new Date(dateString);

        //     let options = { 
        //         month: "long",
        //         weekday:"short",  
        //         day: "numeric", 
        //         hour: "numeric", 
        //         minute: "numeric", 
        //         hour12: true 
        //     };
        //     return dateObj.toLocaleString('en-US', options) 
        // },

    },
}
</script>

<style lang="scss" src="../assets/main.scss"/>
