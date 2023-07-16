<template>
      <!-- Toggle View -->
      <div style="display:flex">
        <div style="margin-right: 10px">
            <input type="radio" value="Week" name="calendar"/>
            <label>Week</label>
        </div>
        <div>
            <input type="radio" value="Day" name="calendar"/>
            <label>Day</label>
        </div>
    </div>
    <!-- Calendar Component -->
    <div class="hyyp-calendar-wrapper">
        <FullCalendar :options="calendarOptions" class="hyyp-calendar" />
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: 'dayGridWeek'
            }
        }
    }
}
</script>

<style lang="scss" src="../assets/main.scss"/>
